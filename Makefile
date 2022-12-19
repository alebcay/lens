CMD_ARGS = $(filter-out $@,$(MAKECMDGOALS))

%:
  @:

NPM_RELEASE_TAG ?= latest
ELECTRON_BUILDER_EXTRA_ARGS ?=

ifeq ($(OS),Windows_NT)
    DETECTED_OS := Windows
else
    DETECTED_OS := $(shell uname)
endif

node_modules: package-lock.json
	npm clean-install

binaries/client: node_modules
	npm run download:binaries

.PHONY: compile-dev
compile-dev: node_modules
	npm run compile:main -- --cache
	npm run compile:renderer -- --cache

.PHONY: validate-dev
ci-validate-dev: binaries/client compile-dev

.PHONY: dev
dev: binaries/client
	rm -rf static/build/
	npm run build:tray-icons
	npm run dev

.PHONY: lint
lint: node_modules
	npm run lint

.PHONY: tag-release
tag-release:
	scripts/tag-release.sh $(CMD_ARGS)

.PHONY: test
test: node_modules binaries/client
	npm exec -- jest $(or $(CMD_ARGS), "src")

.PHONY: integration
integration: build
	npm run integration

.PHONY: build
build: node_modules binaries/client
	npm run build:tray-icons
	npm run compile
ifeq "$(DETECTED_OS)" "Windows"
# https://github.com/ukoloff/win-ca#clear-pem-folder-on-publish
	rm -rf node_modules/win-ca/pem
endif
	npm exec -- electron-builder --publish onTag $(ELECTRON_BUILDER_EXTRA_ARGS)

src/extensions/npm/extensions/__mocks__:
	cp -r __mocks__ src/extensions/npm/extensions/

src/extensions/npm/extensions/dist: src/extensions/npm/extensions/node_modules
	npm run compile:extension-types

src/extensions/npm/extensions/node_modules: src/extensions/npm/extensions/package.json
	cd src/extensions/npm/extensions/ && ../../../../node_modules/.bin/npm install --no-audit --no-fund --no-save

.PHONY: build-npm
build-npm: build-extension-types src/extensions/npm/extensions/__mocks__
	npm run npm:fix-package-version

.PHONY: build-extension-types
build-extension-types: node_modules src/extensions/npm/extensions/dist

.PHONY: publish-npm
publish-npm: node_modules build-npm
	./node_modules/.bin/npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
	cd src/extensions/npm/extensions && npm publish --access=public --tag=$(NPM_RELEASE_TAG)
	git restore src/extensions/npm/extensions/package.json

.PHONY: build-docs
build-docs:
	npm run typedocs-extensions-api

.PHONY: docs
docs: build-docs
	npm run mkdocs-serve-local

.PHONY: clean-npm
clean-npm:
	rm -rf src/extensions/npm/extensions/{dist,__mocks__,node_modules}

.PHONY: clean
clean: clean-npm
	rm -rf binaries/client
	rm -rf dist
	rm -rf static/build
	rm -rf node_modules
	rm -rf site
	rm -rf docs/extensions/api
