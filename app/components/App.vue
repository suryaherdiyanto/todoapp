<template>
    <Page>
        <ActionBar class="bg-primary">
            <ActionItem>
              <Label text.decode="&#xea0a;" class="ico text-light action-icon" verticalAlignment="center" />
            </ActionItem>
            <ActionItem>
              <Label text.decode="&#xe971;" class="ico text-light action-icon" verticalAlignment="center" />
            </ActionItem>
        </ActionBar>
          
        <ScrollView>
            
          <StackLayout>
            
            <ActivityIndicator v-if="isProcessing" :busy="isProcessing" />

            <StackLayout v-for="(items, index) in tasks" :key="index" orientation="horizontal">
              
              <TaskCard v-for="task in items" :key="task.id" :task="task"></TaskCard>
              
            </StackLayout>

          </StackLayout>

        </ScrollView>
        
    </Page>
</template>

<script>
  import { request, getJSON } from 'tns-core-modules/http';
  import { mapState } from 'vuex';
  import TaskCard from './TaskCard';
  import Toast from 'nativescript-toast';

  export default {
    computed: {
      ...mapState(['isProcessing'])
    },
    components: {
      TaskCard
    },
    data() {
      return {
        msg: 'Hello World!',
        tasks: []
      }
    },
    methods: {
      isEven(num) {
        if (num % 2 === 0) {
          return false;
        }

        return true;
      }
    },
    mounted() {
      
      this.$nextTick(() => {
        this.$store.commit('processing');

        request({
          url: `${this.$store.state.serviceURL}/api/tasks?user_id=1`,
          headers: {
            'Authorization': `Bearer ${this.$store.state.auth.token}`,
          }
        }).then((response) => {

          let responseData = response.content.toJSON().data;

          if (response.statusCode !== 200) {

            responseData = response.content.toJSON();
            Toast.makeText(responseData.message).show();

            return;
          }
          
          const rows = Math.ceil(responseData.length / 2);
          
          let sliceIndex = 0;
          let sliceEnd = 2;
          

          for (let index = 0; index < rows; index++) {
            this.tasks.push([...responseData.slice(sliceIndex, sliceEnd)]);
            sliceIndex += 2;
            sliceEnd += 2;
          }
          

          this.$store.commit('processed');
        }, (error) => {
          Toast.makeText("No internet").show();
          console.log(error);
        });

      });
    }
  }
</script>

<style scoped>
ActionBar {
  margin-left: 0;
}
</style>
