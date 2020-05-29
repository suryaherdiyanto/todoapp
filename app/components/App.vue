<template>
    <Page>
      <GridLayout rows="*" columns="*">
        <Frame v-if="isAuth">
          <Main />
        </Frame>

        <Frame v-if="!isAuth">
          <Login />
        </Frame>
      </GridLayout>
    </Page>
</template>

<script>
import { mapState } from 'vuex';
import Main from './Main';
import Login from './Login';


export default {
	computed: {
		...mapState(['isAuth'])
	},
	components: {
		Main,
		Login
	},
}
</script>

<style scoped>
ActionBar {
  margin-left: 0;
}
</style>
