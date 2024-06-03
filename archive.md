---
layout: main
title: "Archive"
permalink: /archive.html
page_type: "Archive"
---
<p class="navigation-bar">
  <a href="/index.html">Home</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/blogs.html">Blogs</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <b>Archive</b>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/about.html">About</a>
</p>

<div>
    <style>
        ul {
            height: 1px;
            /* 字符间隔-8px */
            letter-spacing: -8px;
        }

        li {
            height: 5px;
            /* display: inline-block; */
            /* 字符间隔默认 */
            letter-spacing: normal;
        }

        h3 {
			height: 2px;
		}
    </style>
</div>
# Archive

Sometimes, I write down what I learned, what I thought, what surprised me, and what I wanted to remember.

{% assign posts_by_year = site.posts | sort: "date" | reverse %}
{% assign current_year = nil %}

{% for post in posts_by_year %}
  {% capture post_year %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% if current_year != post_year %}
    {% if current_year %}
    {% endif %}
    {% assign current_year = post_year %}
   <h3>{{ current_year }}</h3>
  {% endif %}
  <ul><li><a href="{{ post.url }}">{{ post.date | date: "%d %b %Y" }} -- {{ post.title }}</a></li></ul>
  {% if forloop.last %}
  {% endif %}
{% endfor %}
