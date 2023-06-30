<template lang="pug">
footer.footer
  .footer__left
    span Made by Festsnusa 
  .footer__right
    span Contacts:
    ul.contacts 
      li.contact
        a(href="https://t.me/onetrickponiee" target="_blank") 
          img(src="@/assets/images/telegram.svg", alt="telegram")
      li.contact
        a(href="https://github.com/festsnusa" target="_blank") 
          img(src="@/assets/images/github.svg", alt="github")
      li.contact 
        a(href="https://www.codewars.com/users/madhaus" target="_blank") 
          img(src="@/assets/images/codewars.svg", alt="codewars")

</template>

<script>
export default {
  name: "AppFooter",
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2.5rem;

  &__right {
    display: flex;
    flex-direction: column;

    span {
      margin: 0 auto;
    }
  }
}

ul {
  list-style: none;
}

.contacts {
  display: flex;
}

.contact {
  img {
    width: 2rem;
    background-color: #fff;
    margin: 1rem;
    border-radius: 50%;
  }
}
</style>