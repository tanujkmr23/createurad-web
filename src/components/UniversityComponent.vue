<template>
    <div>
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
            <div class="uk-card-media-left uk-cover-container">
                <img :src="require('../assets/img/'+universityData.image)" alt="" uk-cover>
                <canvas width="600" height="400"></canvas>
            </div>
            <div>
                <div class="uk-card-body">
                    <h5 class="uk-card-title uk-text-bold">{{universityData.name}}</h5>
                    <div class="uk-flex">
                        <legend class="uk-text-small uk-text-bold">Country: </legend>
                        <span class="uk-text-truncate" :uk-tooltip="universityData.country + '('+universityData.alpha_two_code+')'">{{universityData.country + '('+universityData.alpha_two_code+')'}}</span>
                    </div>
                    <div class="uk-flex">
                        <legend  class="uk-text-small uk-text-bold">Domain: </legend>
                        <span class="uk-text-truncate" :uk-tooltip="universityData.domain">{{universityData.domain }}</span>
                    </div>
                    <div class="uk-flex">
                        <legend  class="uk-text-small uk-text-bold">Webpage: </legend>
                        <span class="uk-text-truncate" :uk-tooltip="universityData.web_page">{{ universityData.web_page }}</span>
                    </div>

                    <div class="uk-flex uk-text-center uk-margin-small-top">
                        <div>
                            <button class="uk-button uk-button-small uk-button-primary uk-margin-right" uk-tooltip="Update University" @click.prevent="updateUniversity(universityData)"><i class="mdi mdi-square-edit-outline"></i></button>
                            <button class="uk-button uk-button-small uk-button-danger"><i class="mdi mdi-delete" uk-tooltip="Delete University" @click.prevent="deleteUniversity(universityData)"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UniversityComponent',
    props: {
        universityData: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
      univerityImage () {
        return require('../assets/img/university_1.jpg');
      }
    },
    methods: {
        updateUniversity: function (universityData) {
            console.log('universityData : ', universityData)
            this.$emit("emitUpdateFunction", universityData);
        },
        deleteUniversity: function (universityData) {
            this.$emit("emitDeleteFunction", universityData);
        }
    }
}
</script>