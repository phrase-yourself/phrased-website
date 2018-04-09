browserify = ./node_modules/.bin/browserify
postcss = ./node_modules/.bin/postcss

src = $(wildcard components/**/*) index.html
dist = $(addprefix dist/,$(src))

##############################################
# TODO: How to make this more generic?
lib = dist/lib/webcomponents-lite.js dist/lib/custom-elements-es5-adapter.js

dist/lib/webcomponents-lite.js: node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js
	mkdir -p $(dir $@)
	cp $^ $@

dist/lib/custom-elements-es5-adapter.js: node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js
	mkdir -p $(dir $@)
	cp $^ $@
##############################################

dist/%.js: %.js
	mkdir -p $(dir $@)
	$(browserify) -t [ babelify --presets [ env ] ] $^ -o $@

dist/%.css: %.css
	mkdir -p $(dir $@)
	$(postcss) $^ -o $@

dist/%.html: %.html
	mkdir -p $(dir $@)
	cp $^ $@

dist: $(dist) $(lib)
