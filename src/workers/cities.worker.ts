import * as oboe from 'oboe';

const ctx: Worker = self as any;

let stream: any;
ctx.addEventListener('message', e => {
	const value = e.data;

	if (stream) stream.abort();

	if (value) {
		stream = oboe('/data/city.list.json').node('cities.*', city => {
			if (city.name.startsWith(value)) {
				ctx.postMessage({ name: city.name, id: city.id });
			}
		})
	}
});
