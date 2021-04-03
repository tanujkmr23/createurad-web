<template>
  <div>
    <button
      class="uk-modal-close-default"
      type="button"
      data-uk-close
      @click.prevent="clearForm"
    ></button>
    <div class="uk-modal-header">
      <h5 class="uk-modal-title uk-text-large">{{universityData ? 'Update University' : 'Add University'}}</h5>
    </div>
    <div class="uk-padding">
      <form class="uk-form-horizontal">
        <div class="uk-margin">
          <label class="uk-form-label" for="form-horizontal-text">Name</label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-horizontal-text"
              type="text"
              placeholder="University name..."
              v-model="universityForm.name"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-horizontal-text">Country: </label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-horizontal-text"
              type="text"
              placeholder="Country Name..."
              v-model="universityForm.country"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-horizontal-text">Country Code: </label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-horizontal-text"
              type="text"
              placeholder="Country Code..."
              v-model="universityForm.alpha_two_code"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-horizontal-text">Domain: </label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-horizontal-text"
              type="text"
              placeholder="Domain e.g, example.edu"
              v-model="universityForm.domain"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label" for="form-horizontal-text">Website: </label>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              id="form-horizontal-text"
              type="text"
              placeholder="Website e.g, https://example.edu"
              v-model="universityForm.web_page"
              required
            />
          </div>
        </div>

        <div class="uk-margin">
          <div class="uk-form-controls">
            <button class="uk-button uk-button-primary" @click.prevent="submit">{{universityData ? 'Update' : 'Submit'}}</button>
          </div>
        </div> 
      </form>
    </div>
  </div>
</template>

<script>
import apis from "../../apis/university";
import axios from "axios";
import UIkit from "uikit";
export default {
  name: "UniversityEditDialog",
  props: {
    universityData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      universityForm: {
        id: this.universityData ? this.universityData.id : undefined,
        alpha_two_code: "",
        country: "",
        name: "",
        domain: "",
        web_page: "",
      },
    };
  },
  mounted() {
      if(this.universityData) {
          this.setFormData()
      }
  },
  methods: {
    setFormData: function () {
        this.universityForm = {
            id: this.universityData.id,
            alpha_two_code: this.universityData.alpha_two_code,
            country: this.universityData.country,
            name: this.universityData.name,
            domain: this.universityData.domain,
            web_page: this.universityData.web_page,
        }
    },
    async submit() {
      await axios
        .post(apis.CREATE_OR_UPDATE_UNIVERSITY, this.universityForm)
        .then((response) => {
          console.log("response : ", response);
          if (response.status === 201) {
            this.clearForm();
            this.$emit("emitFunction");
          }
        })
        .catch((err) => {
          UIkit.notification("Error :" + err, { status: "danger" });
        });
    },
    clearForm() {
      this.universityForm = {
        alpha_two_code: "",
        country: "",
        name: "",
        domain: "",
        web_page: "",
      };
    },
  },
};
</script>

<style scoped>
</style>
