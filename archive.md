---
layout: main
title: "Archive"
permalink: /archive.html
---

<p class="navigation-bar">
  <a href="/index.html">Home</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/blogs.html">Blogs</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <b>Archive</b>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="/about.html">About</a>
</p>

# Archive

Sometimes, I write down what I learned, what I thought, what surprised me, and what I wanted to remember.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

