SHELL = /bin/bash

PYTHON = python3
FRONTEND_DIR = ./frontend
BACKEND_DIR = ./backend/df_designer


.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s : %s\n", $$1, $$2}' | grep -v 'make .* &&'

	@echo ""
	@echo "These targets are for internal use only:"
	@echo "check_project_arg, "


# frontend cmds
.PHONY: install_frontend_env
install_frontend_env: ## Installs frontend dependencies using bun
	cd ${FRONTEND_DIR} && bun install

.PHONY: clean_frontend_env
clean_frontend_env: ## Removes node_modules directory
	cd ${FRONTEND_DIR} && rm -rf node_modules

.PHONY: build_frontend
build_frontend: install_frontend_env ## Builds frontend
	cd ${FRONTEND_DIR} && bun run build

.PHONY: run_frontend
run_frontend: install_frontend_env ## Does same as run_dev_frontend
	cd ${FRONTEND_DIR} && bun run dev

.PHONY: run_dev_frontend
run_dev_frontend: install_frontend_env ## Runs frontend in dev mode
	make run_frontend


# backend cmds
.PHONY: install_backend_env
install_backend_env: ## Installs backend dependencies using poetry
	cd ${BACKEND_DIR} && poetry install

.PHONY: clean_backend_env
clean_backend_env: ## Removes backend dependencies using poetry
	cd ${BACKEND_DIR} && poetry install_env remove --all

.PHONY: build_backend
build_backend: install_backend_env ## Builds the backend wheel
	cd ${BACKEND_DIR} && poetry build

.PHONY: check_project_arg
check_project_arg:
	@if [ -z "$(PROJECT_NAME)" ]; then \
        echo "PROJECT_NAME is not defined. Please pass PROJECT_NAME=<name> with the command."; \
        exit 1; \
    fi

.PHONY: run_backend
run_backend: check_project_arg ## Runs backend using the built dist. NEEDS arg: PROJECT_NAME
	cd ${PROJECT_NAME} && poetry install && poetry run dflowd run_app --conf-reload="False"

.PHONY: run_dev_backend
run_dev_backend: check_project_arg install_backend_env ## Runs backend in dev mode. NEEDS arg: PROJECT_NAME
	cd ${BACKEND_DIR} && poetry run dflowd run_app --project-dir ../../${PROJECT_NAME}

# backend tests
.PHONY: unit_tests
unit_tests: ## Runs all backend unit tests
	if [ ! -d "./df_designer_project" ]; then \
		cd "${BACKEND_DIR}" && \
		poetry run dflowd init --destination ../../ --no-input --overwrite-if-exists; \
	fi

	cd df_designer_project && \
	poetry install && \
	poetry run pytest ../${BACKEND_DIR}/app/tests/api ../${BACKEND_DIR}/app/tests/services


.PHONY: integration_tests
integration_tests: ## Runs all backend integration tests
	if [ ! -d "./df_designer_project" ]; then \
		cd "${BACKEND_DIR}" && \
		poetry run dflowd init --destination ../../ --no-input --overwrite-if-exists; \
	fi

	cd df_designer_project && \
	poetry install && \
	poetry run pytest ../${BACKEND_DIR}/app/tests/integration


.PHONY: backend_e2e_test
backend_e2e_test: ## Runs e2e backend test
	if [ ! -d "./df_designer_project" ]; then \
		cd "${BACKEND_DIR}" && \
		poetry run dflowd init --destination ../../ --no-input --overwrite-if-exists; \
	fi

	cd df_designer_project && \
	poetry install && \
	poetry run pytest ../${BACKEND_DIR}/app/tests/e2e
	

.PHONY: backend_tests
backend_tests: ## Runs all backend tests
	make unit_tests
	make integration_tests
	make backend_e2e_test


# app cmds
.PHONY: install_env
install_env: ## Installs frontend & backend deps
	make install_frontend_env
	make install_backend_env

.PHONY: clean_env
clean_env: ## Removes frontend & backend deps
	make clean_frontend_env
	make clean_backend_env

.PHONY: build
build: install_env ## Builds both frontend & backend
	make build_frontend
	make build_backend

.PHONY: run_app
run_app: check_project_arg install_env build_frontend ## Builds frontend and backend then runs the app. NEEDS arg: PROJECT_NAME
	cp ${FRONTEND_DIR}/dist/* ${BACKEND_DIR}/app/static/ && \
	make build_backend && \
	make run_backend PROJECT_NAME=${PROJECT_NAME}

.PHONY: run_dev
run_dev: check_project_arg install_env ## Runs both backend and frontend in dev mode. NEEDS arg: PROJECT_NAME
	make run_dev_backend PROJECT_NAME=${PROJECT_NAME} &
	make run_dev_frontend



.PHONY: init_proj
init_proj: install_backend_env ## Initiates a new project using dflowd
	cd ${BACKEND_DIR} && poetry run dflowd init --destination ../../


.PHONY: build_docs
build_docs: install_backend_env ## Builds the docs
	cd docs && make html && cd ../
