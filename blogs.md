---
layout: main
title: "Blogs"
permalink: /blogs.html
page_type: "Blogs"
---
<p class="navigation-bar">
  <a href="/index.html">Home</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <b>Blogs</b>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/archive.html">Archive</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/about.html">About</a>
</p>

> This page only displays a maximum of ten articles, Please refer to the <a href="/archive.html">Archive</a> for more information.

<div style="text-align: center; padding-bottom: 10px;">
  <style>
    a.btn-rss {
      color: #EC7063;
      opacity: 0.8;
      display: inline-block;
    }
    a.btn-rss:hover, a.btn-rss:focus {
      opacity: 1;
    }
    img.subscribe-rss {
      height: 24px;
      vertical-align: middle;
      padding-left: 3px;
    }
  </style>
</div>

### Technical

<ul>
  {% assign count = 0 %}
  {% for category in site.categories %}
    {% if category[0] == "Technical" %}
      {% for post in category[1] %}
        {% if count < 10 %}
          <li>
            <a href="{{ post.url }}">{{ post.title }}</a><br>
            {{ post.date | date_to_string }} - {{ post.author }}<br>
            <small>{{ post.excerpt }}</small>
          </li>
          {% assign count = count | plus: 1 %}
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>

### Personal

<ul>
  {% assign count = 0 %}
  {% for category in site.categories %}
    {% if category[0] == "Memo" %}
      {% for post in category[1] %}
        {% if count < 10 %}
          <li>
            <a href="{{ post.url }}">{{ post.title }}</a><br>
            {{ post.date | date_to_string }} - {{ post.author }}<br>
            <small>{{ post.excerpt }}</small>
          </li>
          {% assign count = count | plus: 1 %}
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>

<ul>
  {% assign count = 0 %}
  {% for category in site.categories %}
    {% if category[0] == "Personal" %}
      {% for post in category[1] %}
        {% if count < 10 %}
          <li> 
            <a href="{{ post.url }}">{{ post.title }}</a><br>
            {{ post.date | date_to_string }} - {{ post.author }}<br>
            <small>{{ post.excerpt }}</small>
          </li>
          {% assign count = count | plus: 1 %}
        {% endif %} 
      {% endfor %}
    {% endif %}
  {% endfor %}
</ul>

