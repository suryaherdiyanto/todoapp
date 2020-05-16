<template>
    <Page :actionBarHidden="true">
        <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
            
            <StackLayout>
                <Label class="h2 text-center text-dark" text="Todoapp Login"/>
            </StackLayout>

            <GridLayout rows="auto, auto, auto">
                <StackLayout class="form-group flex align-items-center" row="0" orientation="horizontal">
                    <GridLayout columns="*,auto">  
                        <Image src.decode="font://&#xe945;" class="ico icon-prepend text-dark-grey" stretch="none" />
                        <TextField class="textfield-icon-prepend" keyboardType="email" hint="Your email"  />
                    </GridLayout>
                </StackLayout>

                <ActivityIndicator rowSpan="3" :busy="false"></ActivityIndicator>
                
                <StackLayout row="1" orientation="horizontal" class="form-group">
                    <GridLayout columns="*,auto">  
                        <Image src.decode="font://&#xe98d;" class="ico icon-prepend text-dark-grey" stretch="none" />
                        <TextField class="textfield-icon-prepend" :secure="true" hint="Your password" />
                    </GridLayout>
                </StackLayout>

                <StackLayout orientation="horizontal" row="2">
                    <Label paddingLeft="20" paddingBottom="20" :textWrap="true">
                        <FormattedString>
                            <Span class="text-dark" text="Doesn't have account yet?"></Span>
                            <Span class="text-dark" text=" Register"></Span>
                        </FormattedString>
                    </Label>
                    <Label @tap="onButtonTap">
                        <FormattedString>
                            <Span class="text-primary" text=" here."></Span>
                        </FormattedString>
                    </Label>
                </StackLayout>
            </GridLayout>

            <StackLayout class="p-l-20 p-r-20">
                <Button text="Login" width="100%" class="-primary -activate" @tap="onButtonTap"></Button>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Toast from 'nativescript-toast';

export default {
    data() {
        return {
            msg: ""
        }
    },
    methods: {
        onButtonTap() {
            Toast.makeText('Hallo tetangga').show();
        }
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 20;
}
</style>