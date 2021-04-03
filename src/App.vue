<template>
  <div id="app">
    <div class="uk-width-1-1@m university-header">
      <div class="uk-navbar" data-uk-navbar="mode: click; duration: 360">
        <div class="uk-navbar-left nav-overlay university-title" aria-hidden="false">
          Universities
        </div>
        
        <div class="nav-overlay nav-overlay-small uk-navbar-right">
          <div class="add-university-button">
            <button class="uk-button" href.prevent @click="addUniversity">
              Add <i class="mdi mdi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="search-box">
        <div class="uk-width-1-1 uk-grid" uk-grid>
          <div class="uk-width-1-2@m uk-width-1-1@s">
            <input class="uk-input" v-model="filter.search_key" @input="resetFilter('search_key')" placeholder="Search by university name..">
          </div>
          <div class="uk-width-1-3@m uk-width-1-1@s">
            <input class="uk-input" v-model="filter.filter_key" @input="resetFilter('filter_key')" placeholder="Filter by country code i.e, IN,US etc or by domain extension i.e, .edu, .us etc">
          </div>
          <div class="uk-width-1-6@m uk-width-1-1@s">
            <button class="uk-button uk-button-primary uk-width-1-1" @click="search"><i class="mdi mdi-magnify"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="uk-child-width-1-2@m uk-child-width-1-1@s" uk-grid uk-height-match="target: > div > div > .uk-card">
      <div v-for="(d, index) in universities.items" :key="index">
        <UniversityComponent :key="index" :university-data="d" 
        @emitUpdateFunction="updateUniversity"
        @emitDeleteFunction="deleteUniversity"
        ></UniversityComponent>
      </div>
      <div v-if="universities.items && universities.items.length == 0" class="uk-width-1-1 uk-text-center">
        NO RESULT FOUND!!
      </div>

    </div>
    <div class="uk-width-1-1 uk-text-right">
      <ul class="uk-pagination uk-flex-center uk-margin-remove uk-padding-small" uk-margin>
        <li v-for="d in universities.pages" :key="d">
          <button class="uk-button uk-pagination-button" :class="{'active': d == filter.page }" @click.prevent="getUniversity(d)">{{d}}</button>
        </li>
      </ul>
    </div>
    <!--Spinner-->
    <div class="overlay"></div>

    <div id="add-modal" class="uk-modal" uk-modal bg-close="false">
      <div v-if="isModelOpen" class="uk-modal-dialog">
        <UniversityEditDialog
          @emitFunction="closeAddModel"
        />
      </div>
    </div>

    <div id="edit-modal" class="uk-modal" uk-modal bg-close="false">
      <div v-if="universityData !== null" class="uk-modal-dialog">
        <UniversityEditDialog
        :university-data="universityData"
          @emitFunction="closeEditModel"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import '@/assets/scss/main.scss';
import apis from './apis/university';
import axios from 'axios'
import UIkit from 'uikit'
import UniversityComponent from './components/UniversityComponent.vue';
import UniversityEditDialog from './components/dialog/UniversityEditDialog.vue';
export default {
  name: 'App',
  components: {
    UniversityComponent,UniversityEditDialog
  },
  data() {
    return {
      filter: {
        page: 1,
        limit: 6,
        search_key: '',
        filter_key: ''
      },
      universities: {},
      images: [
        'university_1.jpg', 'university_2.jpg','university_3.jpg'
      ],
      isModelOpen: false,
      universityData: null
    }
  },
  beforeDestroy() {
    if (UIkit.modal('#edit-modal')) {
      UIkit.modal('#edit-modal').hide()
    }
    if (UIkit.modal('#add-modal')) {
      UIkit.modal('#add-modal').hide()
    }
  },
  mounted() {
    this.getUniversity();
  },
  methods: {

    startSpinner: function () {
      document.getElementsByTagName("BODY")[0].classList.add('loading');
    },

    stopSpinner: function () {
      document.getElementsByTagName("BODY")[0].classList.remove('loading');
    },

    getUniversity: async function (page) {
      const self = this;
      if(page) {
        this.filter.page = page
      }
      this.startSpinner();
      await axios.post(apis.GET_UNIVERSITY, self.filter).then(function (res) {
        console.log("res : ",res)
        if(res.status === 200) {
          self.universities = res.data;
          /**Add random images in the university list. */
          self.universities.items = self.universities.items.map(function (item) {
            item['image'] = self.images[Math.floor(Math.random() * self.images.length)]
            return item;
          });
        }
        self.stopSpinner()
      }).catch(err => {
        UIkit.notification('Error : '+err, {status: 'danger'});
        self.stopSpinner()
      });
      
    },

    search: function () {
      this.getUniversity(1);
    },

    resetFilter: function (key) {
      console.log('called', key);
      if(this.filter[key] === '') {
        console.log('called');
        this.getUniversity(1);
      }
    },
    addUniversity() {
      const self = this;
      this.isModelOpen = false;
      this.startSpinner();
      UIkit.modal('#edit-modal').hide()
      setTimeout(function(){
        self.isModelOpen = true;
        UIkit.modal('#add-modal').show()
        self.stopSpinner();
      },500)
      this.isModelOpen = true;
      UIkit.modal('#add-modal').show()
    },

    updateUniversity: function (universityData) {
      const self = this;
      this.startSpinner();
      this.universityData = null;
      UIkit.modal('#add-modal').hide()
      setTimeout(function(){
        self.universityData = universityData;
        UIkit.modal('#edit-modal').show()
        self.stopSpinner();
      },500)
      
    },

    deleteUniversity: async function (universityData) {
      const self = this;
      let paylaod = {
        id: universityData.id
      }
      this.startSpinner();
      await axios.post(apis.DELETE_UNIVERSITY, paylaod).then(function (res) {
        if(res.status === 201) {
          UIkit.notification('University has been deleted successfully : ', {status: 'sucess'});
          self.stopSpinner()
          self.getUniversity(1)
        }else if(res.status === 400) {
          UIkit.notification('Unsuccessful ', {status: 'danger'});
          self.stopSpinner()
        }
        
      }).catch(err => {
        UIkit.notification('Error : '+err, {status: 'danger'});
        self.stopSpinner()
      });
    },



    closeEditModel: function () {
      UIkit.modal('#edit-modal').hide()
      this.getUniversity(1)
    },
    closeAddModel: function () {
      UIkit.modal('#add-modal').hide()
      this.getUniversity(1)
    },
    
  }
}
</script>

<style>

</style>
