<script setup>

const images = ref([
    "0xJJ2z4X6orK4aBaNQ5TcTEBGU9HNKpobv3j5ZsiK0d0Aqt0lllYJl2QDgwHafk1WbHksnrqbd5MZPnUpaUJt3OhYHlyjEgxyHhIov.jpg",
    "4xOBUfvFzmYiTnKjJyv7cPDY7R4hIBBhZrPB3yKwbLKsF3nKzBOPZdZtA7gONrEc9MjE1mWlxWhVfIXXRijLDffY4I0INWHLBzzcoF.jpg",
    "4xOBUfvFzmYiTnKjJyv7cPDY7R4hIBBhZrPB3yKwbLKsF3nKzBOPZdZtA7gONrEc9MjE1mWlxWhVfIXXRijLDffY4I0INWHLBzzcoF.jpg",
    "8HfR3jUsfbKMsPiZl66zt79CIVXuEi0ZBrq2JX0YbJehccU9TlIpBYsA3E0DYxbVCWLH0GQzbaB9ix4wdENcT7Ppc4KepKBILTPEk6.jpg",
    "GATqLbBuQv2MEQw6eHUYEXnz6Yc5kbwEYTOSH4dZLwHQRxEKi1HLUGWhxMfzvB1OWYniCEB1lVsuTf6GFsyz0NFTwabQ2NjjEYGhSE.jpg",
    "LS40t7bR9u9zBqq8pAfkb1lIJAKM4tg73GONJK5IWo3lyAbb7NcnGPNPAWzR8v59LNnmj1KdSwHKWFip5sj1YvRS8xEcbxZfUG5wiz.jpg",
    "GATqLbBuQv2MEQw6eHUYEXnz6Yc5kbwEYTOSH4dZLwHQRxEKi1HLUGWhxMfzvB1OWYniCEB1lVsuTf6GFsyz0NFTwabQ2NjjEYGhSE.jpg",
    "GATqLbBuQv2MEQw6eHUYEXnz6Yc5kbwEYTOSH4dZLwHQRxEKi1HLUGWhxMfzvB1OWYniCEB1lVsuTf6GFsyz0NFTwabQ2NjjEYGhSE.jpg",
])

</script>


<template>
    <div class="py-14">
        <div>
            <div class="text-center space-y-3">
                <h2 class="font-bold text-6xl">My Projects</h2>
                <p class="text-3xl">Examples of my projects completed</p>
            </div>
            <div class="mt-10 max-w-[1200px] mx-5 md:mx-auto">
                <Gallery :images="images"/>
            </div>
        </div>
    </div> 
</template>
