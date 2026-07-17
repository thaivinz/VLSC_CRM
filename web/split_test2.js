const fs = require('fs');
const postcss = require('postcss');

const css = fs.readFileSync('./src/index.css', 'utf-8');

postcss([]).process(css, { from: './src/index.css' }).then(result => {
    let categories = {
        ckeditor: 0,
        materialIcons: 0,
        angular: 0,
        swiper: 0,
        ant: 0,
        tailwind: 0,
        bootstrap: 0,
        base: 0
    };
    result.root.walkRules(rule => {
        let sel = rule.selector;
        if (sel.includes('.ck') || sel.includes('ck-')) categories.ckeditor++;
        else if (sel.includes('.zmdi')) categories.materialIcons++;
        else if (sel.includes('_ng')) categories.angular++;
        else if (sel.includes('swiper')) categories.swiper++;
        else if (sel.includes('.ant-')) categories.ant++;
        else if (sel.includes('.tw-') || sel.match(/\\:/) || sel.startsWith('.bg-') || sel.startsWith('.text-') || sel.startsWith('.p-') || sel.startsWith('.m-')) categories.tailwind++;
        else if (sel.startsWith('.btn') || sel.startsWith('.col-') || sel.startsWith('.row')) categories.bootstrap++;
        else categories.base++;
    });
    console.log(categories);
});
