/*
 * Copyright ©️ 2018-2020 Galt•Project Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2018-2020 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

import {ModalItem} from 'geesome-vue-components/src/modals/AsyncModal'

const _ = require('lodash');

export default {
  template: require('./ApiKeyFormModal.template'),
  props: ['apiKeyInput'],
  components: {
    ModalItem
  },
  created() {
    this.apiKey = _.clone(this.apiKeyInput);
  },
  methods: {
    async ok() {
      if(this.apiKey.id) {
        await this.$coreApi.updateUserApiKey(this.apiKey.id, this.apiKey);
        this.$root.$asyncModal.close('api-key-form-modal', this.apiKey);
      } else {
        this.resultApiKey = await this.$coreApi.addUserApiKey(this.apiKey);
      }
    },
    async cancel() {
      this.$root.$asyncModal.close('api-key-form-modal');
    }
  },
  watch: {},
  computed: {},
  data: function () {
    return {
      apiKey: null,
      resultApiKey: ''
    }
  }
}
