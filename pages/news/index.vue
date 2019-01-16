<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/news/123">News-1</a></li>
        <li><a href="/news/456">News-2</a></li>
      </ul>
  </div>
</template>