---
layout: main
title: "Archive"
permalink: /archive.html
page_type: "Archive"
---

# Archive

Sometimes, I write down what I learned, what I thought, what surprised me, and what I wanted to remember.

{% assign posts_by_year = site.posts | sort: "date" | reverse %}
{% assign current_year = nil %}

{% for post in posts_by_year %}
  {% capture post_year %}{{ post.date | date: "%Y" }}{% endcapture %}
  
  {% if current_year != post_year %}
    {% assign current_year = post_year %}
   <h3>{{ current_year }}</h3>
  {% endif %}
  
  <li>
    <a href="{{ post.url }}">{{ post.date | date: "%d %b %Y" }} - {{ post.title }}</a>
  </li>
  {% if forloop.last or current_year != post_year %}
  {% endif %}
{% endfor %}

