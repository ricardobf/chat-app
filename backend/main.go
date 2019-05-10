package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-redis/redis"
	"github.com/gorilla/websocket"
)

var addr = flag.String("addr", ":8080", "http service address")

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		origin := os.Getenv("ALLOWED_ORIGIN")
		if origin != "" && origin == r.Header.Get("Origin") {
			return true
		}
		return false
	},
}

var hub *Hub
var redisClient *redis.Client

// serveWs handles websocket requests from the peer.
func serveWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{
		hub:   hub,
		redis: redisClient,
		conn:  conn,
		send:  make(chan []byte, 256),
	}

	client.hub.register <- client

	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}

func serveHTTP(w http.ResponseWriter, _ *http.Request) {
	messages, err := redisClient.LRange(redisKey, 0, 1000).Result()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", os.Getenv("ALLOWED_ORIGIN"))
	w.Write([]byte(fmt.Sprintf("[%s]", strings.Join(messages, ","))))
}

func main() {
	flag.Parse()
	hub = newHub()
	go hub.run()

	redisClient = redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_ADDR"),
	})

	http.HandleFunc("/ws", serveWs)
	http.HandleFunc("/messages", serveHTTP)
	err := http.ListenAndServe(*addr, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
