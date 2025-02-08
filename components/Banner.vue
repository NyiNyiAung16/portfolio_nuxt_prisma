<script setup>
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }

  tick() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

onMounted(() => {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
});
</script>

<template>
  <div class="overflow-hidden darkMode transition-colors duration-500">
    <div
      class="container mx-auto flex flex-col justify-center h-[100dvh] dark:text-white"
    >
      <div class="flex flex-col items-center gap-6">
        <div class=" font-bold">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] text-center"
          >
            <a
              href=""
              class="typewrite"
              data-period="2000"
              data-type='[ "Hi, I am Nyi Nyi Aung.", "I am a Full Stack Developer.", "I Love Design.", "I Love to Develop." ]'
            >
              <span class="wrap"></span>
            </a>
          </h1>
        </div>
        <div class="sm:text-2xl md:text-4xl text-1xl font-bold">
          <h4>Web Developer | Showcasing my projects</h4>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="bg-black hover:bg-opacity-90 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black dark:border-white text-sm sm:text-lg md:text-xl duration-150 px-3 py-2 rounded-md active:bg-black/20 active:text-black/90"
          >
            <NuxtLink to="#footer">Contact Me</NuxtLink>
          </button>

          <!-- Outlined Button -->
          <button
            class="border border-black text-black bg-[#eaeaea] hover:bg-opacity-80 dark:border-white dark:text-white dark:bg-[#2D3748] text-sm sm:text-lg md:text-xl duration-150 px-3 py-2 rounded-md active:bg-black active:text-white"
          >
            <NuxtLink to="#expertise">My Expertise</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
