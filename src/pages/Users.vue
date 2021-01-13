<template>
 <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <!-- table -->
        <table>

          <!-- head -->
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')">Gender &#8595;</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr v-for="user in usersSort" :key="user.id.value">
              <td>
                <img :src="user.picture.thumbnail" :alt="user.name">
                 {{ user.name }}</td>
              <td>{{ user.dob.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: center">
          <span>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}
            page: {{ page.current }} / {{ maxPages }},
            user per page: {{ page.length }}</span>
        </p>
      </div>
    </section>

    <!-- buttons -->
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary"
          :class="{'disable': page.current === 1}"
          @click="prevPage">&#8592;</div>
          <div
          :class="{'disable': page.current === maxPages}"
          class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      page: {
        current: 1,
        length: 3,
      },
    };
  },
  /*
  eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["el"] }]
  */
  created() {
    axios
      .get('https://randomuser.me/api/?results=15&inc=id,picture,name,dob,gender')
      .then((response) => {
        const users = response.data.results;
        users.forEach((el) => {
          el.age = el.dob.age;
          el.name = `${el.name.first} ${el.name.last}`;
        });
        this.users = users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    usersSort() {
      return this.users.slice().sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === 'desc') mod = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
        return 0;
      }).filter((row, index) => {
        const start = (this.page.current - 1) * this.page.length;
        const end = this.page.current * this.page.length;
        if (index >= start && index < end) return true;
        return false;
      });
    },
    maxPages() {
      return Math.ceil(this.users.length / this.page.length);
    },
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = e;
    },
    // pagination
    prevPage() {
      if (this.page.current > 1) this.page.current -= 1;
    },
    nextPage() {
      if ((this.page.current * this.page.length) < this.users.length) this.page.current += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 16px;
}

.button-list {
  width: 100%;
  text-align: center;
}

.btn {
  border-radius: 60px;
  margin: 0 20px;
}
.disable {
  background-color: grey !important;
  border: 1px solid grey !important;
  cursor: not-allowed;
}
</style>
