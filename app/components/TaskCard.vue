<template>
    <CardView :ripple="true" width="43%" margin="10" elevation="10" radius="5">
        <GridLayout class="p-5" rows="auto, auto, auto, auto">
        <Label :text="task.title" row="0" class="h4 task-title"></Label>

        <StackLayout row="1" orientation="horizontal">
          
            <Progress width="85%" :value="task.progress_integer" />
            <Label class="text-dark" :text="task.progress_percentage" verticalAlignment="center" />
        </StackLayout>

        <Label :text="task.note" row="2" class="text-dark task-description"></Label>
        <Label row="3" class="text-dark task-deadline m-t-10">
            <FormattedString>
            <Span text="Deadline: " />
            <Span :text="task.deadline" />
            </FormattedString>
        </Label>
        </GridLayout>
    </CardView>
</template>

<script>
export default {
    props: {
        task: {
            required: true,
            type: Object
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped>
.task-title {
    text-transform: capitalize;
}

.task-description {
    font-style: italic;
    font-size: 9;
}

.task-deadline {
    font-weight: 400;
    font-size: 10;
}
</style>