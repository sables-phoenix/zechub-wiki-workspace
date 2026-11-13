const localeBoot = `(function(){try{var locales=${JSON.stringify(["it","fr","es","de","pt","ar","fa","zh","hi","ru","ja","ko","tr","uk","sw","yo","ig","ak","ee","id","el"])};var first=location.pathname.split("/").filter(Boolean)[0];if(locales.indexOf(first)!==-1){document.documentElement.lang=first;document.documentElement.dir=(first==="ar"||first==="fa")?"rtl":"ltr";document.documentElement.dataset.locale=first;}}catch(e){}})();`;

export function LocaleBoot() {
  return <script dangerouslySetInnerHTML={{ __html: localeBoot }} />;
}
