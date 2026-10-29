const fs=require('fs');const f=process.argv[2];let s=fs.readFileSync(f,'utf8');
s=s.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'').replace(/<svg[\s\S]*?<\/svg>/g,'');
s=s.replace(/<img[^>]*src="([^"]+)"[^>]*>/g,' [IMG $1] ').replace(/<(h[1-6])[^>]*>/g,'\n## ').replace(/<\/(p|div|li|h[1-6]|section|br)>/g,'\n').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#x27;|&#39;|&rsquo;/g,"'").replace(/&nbsp;/g,' ').replace(/[ \t]+/g,' ').replace(/\n\s*\n+/g,'\n');
console.log(s.trim());
