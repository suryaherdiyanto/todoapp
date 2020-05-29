<template>
    <Page :actionBarHidden="true">
        <FlexboxLayout flexDirection="column" alignItems="center" justifyContent="center">
            
            <StackLayout>
                <Label class="h2 text-center text-dark" text="Todoapp Login"/>
            </StackLayout>

            <GridLayout rows="auto, auto, auto">
                <StackLayout class="form-group flex align-items-center" row="0" orientation="horizontal">
                    <GridLayout columns="*,auto">  
                        <Label text.decode="&#xe945;" class="ico icon-prepend text-dark-grey" />
                        <TextField v-model="credentials.email" class="textfield-icon-prepend" keyboardType="email" hint="Your email"  />
                    </GridLayout>
                </StackLayout>

                <ActivityIndicator rowSpan="3" :busy="isProcessing"></ActivityIndicator>
                
                <StackLayout row="1" orientation="horizontal" class="form-group">
                    <GridLayout columns="*,auto">  
                        <Label text.decode="&#xe98d;" class="ico icon-prepend text-dark-grey" />
                        <TextField v-model="credentials.password" class="textfield-icon-prepend" :secure="true" hint="Your password" />
                    </GridLayout>
                </StackLayout>

                <StackLayout orientation="horizontal" row="2">
                    <Label paddingLeft="20" paddingBottom="20" :textWrap="true">
                        <FormattedString>
                            <Span class="text-dark" text="Doesn't have account yet?"></Span>
                            <Span class="text-dark" text=" Register"></Span>
                        </FormattedString>
                    </Label>
                    <Label>
                        <FormattedString>
                            <Span class="text-primary" text=" here."></Span>
                        </FormattedString>
                    </Label>
                </StackLayout>
            </GridLayout>

            <StackLayout class="p-l-20 p-r-20">
                <Button text="Login" width="100%" class="-primary -activate" @tap="onLoginTap" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Toast from 'nativescript-toast';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            credentials: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(['isProcessing'])
    },
    methods: {
        onLoginTap() {
            this.$store.commit('processing');

            this.$store.dispatch('login', this.credentials).then((response) => {
                this.$store.commit('processed');
                const responseData = response.content.toJSON();

                if (response.statusCode !== 200) {
                    Toast.makeText(responseData.message).show();
                    return;
                }

                if (responseData.status !== 'ok') {
                    Toast.makeText(responseData.message).show();
                    return;
                }

                console.log(responseData);
                

                this.$store.commit('setToken', responseData.token);
                this.$store.commit('loggedIn');
                this.$store.commit('setUser', responseData.user);

            }).catch((error) => {
                this.$store.commit('processed');
                console.error(`Request error :${error}`);
            });
        }
    }
}
</script>

<style scoped>
.form-group {
    margin-bottom: 20;
}
</style>