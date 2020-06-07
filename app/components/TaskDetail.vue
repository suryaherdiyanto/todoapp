<template>
    <Page>
        <ActionBar :title="taskTitle" class="bg-primary">
            <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="$navigateBack" />
            <ActionItem>
                <Label text.decode="&#xea0a;" class="ico text-light action-icon" verticalAlignment="center" @tap="showPromptDialog" />
            </ActionItem>
        </ActionBar>

        <ScrollView>
            <StackLayout height="100%">
              <ActivityIndicator v-if="isProcessing" :busy="isProcessing" />

              <ListView for="subtask in subtasks">
                <v-template>
                    <GridLayout rows="*, *">
                        <FlexboxLayout alignItems="center" justifyContent="space-between">
                            <Label :text="subtask.name" />
                            <Label text.decode="&#xe9ac;" class="ico text-danger" @tap="deleteTask" />
                        </FlexboxLayout>
                    </GridLayout>
                </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import Toast from 'nativescript-toast';
import { mapState } from 'vuex';

export default {
    props: {
        taskId: {
            type: Number
        },
        taskTitle: {
            type: String,
            default: ''
        },
    },
    
    data() {
        return {
            subtasks: []
        }
    },

    computed: {
        ...mapState(['isProcessing']),
    },

    methods: {
        showPromptDialog() {
            prompt({
                title: 'Create Subtask',
                message: `Enter subtask for ${this.taskTitle}`,
                okButtonText: 'Save',
                cancelButtonText: 'Cancel'
            }).then(({ result, text }) => {
                if (!result) {
                    return;
                }

                this.$store.dispatch('createSubTask', {taskId: this.taskId, taskName: text}).then((response) => {
                    const responseData = response.content.toJSON();
                    console.log(responseData);

                    if (response.statusCode !== 201) {
                        Toast.makeText(responseData.message).show();
                        return;
                    }

                    if (responseData.meta.status !== 'ok') {
                        Toast.makeText(responseData.message).show();
                        return;
                    }

                    this.subtasks.push(responseData.data);
                }, (error) => {
                    Toast.makeText(`Something went wrong ${error}`).show();
                });
            })
        },
        fetchSubTasks() {
            this.$store.commit('processing');
            this.$store.dispatch('getSubTasks', this.taskId).then((response) => {
                const responseData = response.content.toJSON();
                

                if (response.statusCode !== 200) {
                    alert({
                        title: 'Alert',
                        message: responseData.message
                    });

                    return;
                }
                this.subtasks.push(...responseData.data);
                this.$store.commit('processed');
            });
        },
        deleteTask(){
            confirm({
                title: 'Confirmation',
                message: 'Delete this subtask?',
                okButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => {

                if (!result) {
                    return;
                }
            })
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.fetchSubTasks();
        });
    }
}
</script>