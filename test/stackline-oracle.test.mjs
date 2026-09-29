import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {remark} from 'remark';
import fork from '../index.js';
import upstream from 'upstream-oracle';
import stringWidth from 'string-width';
for (const fixture of await readdir(new URL('./fixtures/',import.meta.url))) {
 if(fixture.startsWith('.'))continue;
 test('upstream compatibility: '+fixture, async()=>{
  const base=new URL('./fixtures/'+fixture+'/',import.meta.url);
  const input=await readFile(new URL('input.md',base),'utf8');
  let options;try{options=JSON.parse(await readFile(new URL('config.json',base),'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}
  if(fixture==='table-string-length')options={stringLength:stringWidth};
  const candidate=remark().use(fork,options), reference=remark().use(upstream,options);
  assert.deepEqual(candidate.parse(input),reference.parse(input));
  assert.equal(String(candidate.processSync(input)),String(reference.processSync(input)));
 });
}
