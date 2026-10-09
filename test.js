const fs = require("fs");
const assert = require("assert");
const yaml = require("/root/sub-store/backend/node_modules/yaml");

const source = fs.readFileSync("hongguo-adblock.yaml", "utf8");
const config = yaml.parse(source);

assert.strictEqual(config.name, "红果短剧・红果漫剧去广告");
assert.ok(Array.isArray(config.rules) && config.rules.length >= 10);
assert.ok(Array.isArray(config.url_rewrites) && config.url_rewrites.length >= 3);
assert.ok(config.mitm.hostnames.includes.includes("*.pangolin-sdk-toutiao.com"));

const domainRules = config.rules.map((item) => {
  const [type, rule] = Object.entries(item)[0];
  return { type, ...rule };
});

function matches(host) {
  return domainRules.some((rule) => {
    if (rule.type === "domain") return host === rule.match;
    if (rule.type === "domain_suffix") {
      return host === rule.match || host.endsWith(`.${rule.match}`);
    }
    if (rule.type === "domain_regex") return new RegExp(rule.match).test(host);
    return false;
  });
}

const blocked = [
  "api-access.pangolin-sdk-toutiao.com",
  "ads3-normal-lq.zijieapi.com",
  "p6-ad-sign.byteimg.com",
  "p3-developer-sign.bytemaimg.com",
  "ecom5-normal-lq.ecombdapi.com",
  "ec5-core-lq.ecombdapi.com",
  "v100-reading-ad.qznovelvod.com",
  "v26-se-sjy-daily-reading-ad.qznovelvod.com",
  "zlink.ugsdk.cn",
];

const allowed = [
  "v11-reading-video.qznovelvod.com",
  "v6-reading-videocdn.qznovelvod.com",
  "v9-novelapp.fqnovelvod.com",
  "p3-novel-sign.byteimg.com",
  "p6-novel1-sign.byteimg.com",
  "p3-reading-sign.fqnovelpic.com",
  "api5-normal.fqnovel.com",
  "security.snssdk.com",
  "p3-aio.ecombdimg.com",
];

for (const host of blocked) assert.ok(matches(host), `应该拦截：${host}`);
for (const host of allowed) assert.ok(!matches(host), `不应拦截：${host}`);

for (const rewrite of config.url_rewrites) {
  assert.doesNotThrow(() => new RegExp(rewrite.match), `重写正则无效：${rewrite.match}`);
  assert.ok(/^http:\/\/reject-(dict|video)\/$/.test(rewrite.location));
}

console.log(`通过：${config.rules.length} 条域名规则，${config.url_rewrites.length} 条 URL 重写`);
console.log(`拦截样本：${blocked.length}/${blocked.length}`);
console.log(`正常样本放行：${allowed.length}/${allowed.length}`);
