browserify = ./node_modules/.bin/browserify

src = $(wildcard components/**/*) $(wildcard lib/*) index.html
dist = $(addprefix dist/,$(src)) dist/bundle.js

js = $(wildcard components/**/*.js)

dist: $(dist)

@phony:
clean:
	rm -fr dist

## Rules

dist/%.js: %.js
	mkdir -p $(dir $@)
	$(browserify) -t [ babelify --presets [ env ] ] $< -o $@

dist/lib/%.js: lib/%.js
	mkdir -p $(dir $@)
	cp $< $@

dist/bundle.js: $(js)
	mkdir -p $(dir $@)
	$(browserify) -t [ babelify --presets [ env ] ] $^ -o $@

dist/%: %
	mkdir -p $(dir $@)
	cp $< $@

