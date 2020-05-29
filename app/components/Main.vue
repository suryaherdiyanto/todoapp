<template>
    <Page>
        <ActionBar class="bg-primary" title="My Tasks">
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
import { mapState } from 'vuex';
import TaskCard from './TaskCard';
import Toast from 'nativescript-toast';
import Login from './Login';

export default {
    components: {
        TaskCard
    },
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        ...mapState(['isProcessing'])
    },
    methods: {
        isEven(num) {
            if (num % 2 === 0) {
                return false;
            }

            return true;
        },
        getTasks() {
            this.$store.commit('processing');

            this.$store.dispatch('getTasks').then((response) => {

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
                this.$store.commit('processed');
            });
        },
    },
    mounted() {
      
        this.$nextTick(() => {
            
            this.getTasks();
        });
    }
}
</script>