<template>
 <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">

        <!-- table -->
        <table>

          <!-- head -->
          <thead>
            <tr>
              <th @click="sort('name')">Name</th>
              <th @click="sort('age')">Age</th>
              <th @click="sort('gender')">Gender</th>
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
        <p>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }}</p>
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
      });
    },
  },
  methods: {
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = e;
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
</style>
