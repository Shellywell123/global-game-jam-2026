
.PHONY: dev-server
dev-server:
	python3 -m http.server -b localhost -d client
