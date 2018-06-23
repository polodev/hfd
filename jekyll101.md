# how to write scss in jekyll

make a `.scss` file in any folder and keep a empty front matter 
~~~bash
// style.scss

---
---
$color: teal;
body {
  h2 { color: $color; }
}

~~~

# making a collection 
write following stuff in `_config.yml page`
~~~yml
collections:
  knowledge:
    output: true
    permalink: /:collection/:title/
    published: true
    page: knowledge
~~~    
make a folder name `_knowledge`. Folder name start with `_`. some frontmatter inside single collection   

~~~yml
---
title: Preventive Care
layout: knowledge
number: 1
icon: "{{site.url}}{{site.baseurl}}/assets/images/knowledge/preventive_care_icon.png"
image: "{{site.url}}{{site.baseurl}}/assets/images/knowledge/preventive_care.jpg"
---
~~~

# looping and  sorting collection

~~~md
{%assign knowledge = site.knowledge | sort: 'number' %}
{% for topic in knowledge %}
  <h1>{{topic.title}}</h1>
  <h2>{{topic.number}}</h2>
{% endfor %}
~~~




