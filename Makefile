#!/usr/bin/make -f

IMAGE_NAME=football-simulation
DOCKER_DIR=.docker
NETWORK=football_net

build:
	docker build -t $(IMAGE_NAME) -f $(DOCKER_DIR)/Dockerfile .

create-network:
	@if [ -z "$$(docker network ls | grep $(NETWORK))" ]; then \
		docker network create $(NETWORK); \
	else \
		echo "Network $(NETWORK) already exists"; \
	fi

run-server: create-network
	docker run -it --rm --name football-server -v $(PWD)/src:/app/src --network=$(NETWORK) -p 8080:8080 $(IMAGE_NAME) ts-node src/server/server.ts

run-client:
	docker run -it --rm --name football-client -v $(PWD)/src:/app/src --network=$(NETWORK) $(IMAGE_NAME) ts-node src/client/client.ts

run-controller:
	docker run -it --rm --name football-controller -v $(PWD)/src:/app/src --network=$(NETWORK) $(IMAGE_NAME) ts-node src/server/controller.ts

stop:
	docker stop football-server football-client football-controller

clean-network:
	docker network rm $(NETWORK)

clean: clean-network
	docker rmi $(IMAGE_NAME)
