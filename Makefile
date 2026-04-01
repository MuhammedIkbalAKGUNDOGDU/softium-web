# Softium Management Makefile

.PHONY: build up down restart logs ps clean db-shell

# Default environment variables
NEXT_PUBLIC_API_URL ?= http://localhost

# Build all docker images
build:
	NEXT_PUBLIC_API_URL=$(NEXT_PUBLIC_API_URL) docker compose build

# Start the cluster in detached mode
up:
	NEXT_PUBLIC_API_URL=$(NEXT_PUBLIC_API_URL) docker compose up -d

# Stop the cluster and remove containers
down:
	docker compose down

# Restart all services
restart: down up

# Show logs
logs:
	docker compose logs -f

# Show status
ps:
	docker compose ps

# Clean up docker system (careful!)
clean:
	docker system prune -f
	docker volume prune -f

# Access Database Shell
db-shell:
	docker exec -it softium-db psql -U postgres -d softium_db

# Connect to API shell
api-shell:
	docker exec -it softium-api /bin/bash

# Connect to WEB shell
web-shell:
	docker exec -it softium-web /bin/sh
