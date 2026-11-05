// Runs Python in the browser with Skulpt, loaded from index.html.
// window.PYLEARN_FS can hold simulated files: { "data.txt": "contents" }.

const ENGINE_URLS = [
  'https://cdn.jsdelivr.net/npm/skulpt@1.0.0/dist/skulpt.min.js',
  'https://cdn.jsdelivr.net/npm/skulpt@1.0.0/dist/skulpt-stdlib.js',
];

let pending = null;

export const engineReady = () =>
  typeof window !== 'undefined' &&
  typeof window.Sk !== 'undefined' &&
  !!(window.Sk.builtinFiles && window.Sk.builtinFiles.files);

const waitForGlobal = (ms) =>
  new Promise((resolve) => {
    if (engineReady()) {
      resolve(true);
      return;
    }
    const startedAt = Date.now();
    const timer = setInterval(() => {
      if (engineReady()) {
        clearInterval(timer);
        resolve(true);
      } else if (Date.now() - startedAt > ms) {
        clearInterval(timer);
        resolve(false);
      }
    }, 120);
  });

// Loads the Python engine once per page visit.
export function ensureEngine() {
  if (pending) return pending;
  pending = (async () => {
    if (await waitForGlobal(15000)) return { ok: true };
    return { ok: false };
  })();
  pending.then((res) => {
    if (!res.ok) pending = null;
  });
  return pending;
}

function builtinRead(x) {
  if (window.PYLEARN_FS && window.PYLEARN_FS[x] !== undefined) return window.PYLEARN_FS[x];
  const files = window.Sk && window.Sk.builtinFiles && window.Sk.builtinFiles.files;
  if (!files || files[x] === undefined) throw `File not found: '${x}'`;
  return files[x];
}

// Always resolves with whatever the program printed, plus any error message,
// so the editor can never get stuck waiting for the engine.
export function runPython(code) {
  return new Promise((resolve) => {
    let settled = false;
    let out = '';
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const Sk = window.Sk;
    if (typeof Sk === 'undefined') {
      finish('The Python engine is still loading — try again in a second.');
      return;
    }

    try {
      const config = {
        output: (text) => { out += text; },
        read: builtinRead,
        execLimit: 5000,
      };
      if (Sk.python3) config.__future__ = Sk.python3;
      Sk.configure(config);

      const result = Sk.importMainWithBody('<stdin>', false, code, true);
      if (result && typeof result.then === 'function') {
        result
          .then(() => finish(out))
          .catch((err) => finish(out + (out ? '\n' : '') + String(err)));
      } else {
        finish(out);
      }
    } catch (err) {
      finish(out + (out ? '\n' : '') + String(err));
    }

    // Safety net: never leave the editor spinning forever.
    window.setTimeout(() => {
      finish(out || 'That took too long to run — look for a loop that never ends.');
    }, 6000);
  });
}

export const normalizeOutput = (text) =>
  String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .trim();

export const ENGINE_URLS_LIST = ENGINE_URLS;