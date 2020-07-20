# DNS

This file documents how dBrowser handles DNS and the `domain` assignment in dweb-site manifests.

## DWeb site "Primary URL" (pURL)

Within dBrowser, all DWeb sites have a "Primary URL" (pURL). This is `dweb://{key}` by default. DWeb sites can assign multiple DNS short names, but the pURL will only be changed to a DNS shortname if the site's dweb.json assigns a `"domain"` value. This value will be confirmed against the DNS record.

Therefore the "Primary URL" can be visualized as:

```js
var hostname = key
if (manifest.domain && getDNSRecord(manifest.domain) === key) {
  hostname = manifest.domain
}
var pURL = `dweb://${hostname}`
```

If you intend to use a DNS shortname for a website, you should assign its DNS record *and* set the `domain` in the dweb.json manifest. (dBrowser's UI will help you accomplish this.)

## Normalization to the pURL

Internally, dBrowser will translate URLs to the pURL. Other URLs can be used (in navigation and with the `DatArchive` API) but they will be translated to the pURL internally.

As an example, imagine that both `paulfrazee.com` and `pfrazee.com` point to the same DWeb site, but the `"domain"` is set to `pfrazee.com` making it the pURL. This means that a call to UnwalledGarden's `follow("dweb://paulfrazee.com")` will result in `pfrazee.com` being followed.

You can get the current pURL of a site by using `DatArchive#getInfo()`. The returned `url` value will be the pURL.

## How pURL DNS-record changes are handled

When a pURL points to a DNS shortname, dBrowser will watch for reassignments to new dweb keys via the DNS record. Reassignments are automatically accepted and processed. In most cases, this means updating internal dweb-key records. Unwalled Garden's crawler will automatically reindex the site in order to properly process any changes.

## Expected behaviors based on these rules

### No pURL

When no pURL is set (no `domain` or the `domain` is not confirmed) the site's key-URL will be used internally. This includes for fetching information about the site and for running permission checks.

Interfaces about the site (such as the site-info dropdown) will show the "ID" of the site to be the key. The user will not be able to follow the site unless viewing the key-address.

### Has pURL

When a pURL is set (has `domain` and is confirmed) the site's pURL will be used internally. This includes for fetching information about the site and for running permission checks.

Interfaces about the site (such as the site-info dropdown) will show the ID of the site to be the pURL. The user will be able to follow the site at any address, but the pURL will be followed on use.