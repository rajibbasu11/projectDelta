<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                    <v-row no-gutters>
                        <v-col class="px-2" cols="6">
                            <v-text-field
                                label="First Name"
                                v-model="firstName"
                                type="text"
                                :rules="[v => !!v || 'First Name is required']"
                            ></v-text-field>
                        </v-col>
                        <v-col class="px-2" cols="6">
                            <v-text-field
                                label="Last Name"
                                type="text"
                                v-model="lastName"
                                :rules="[v => !!v || 'Last Name is required']"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                        <v-col class="px-2 py-0" cols="12">
                            <v-text-field
                                label="Email"
                                type="text"
                                v-model="email"
                                :rules="emailRules"
                            ></v-text-field>
                        </v-col>
                        <v-col class="px-2 py-0" cols="12">
                            <v-text-field
                                label="Phone Number"
                                type="number"
                                v-model="mobileNumber"
                                :rules="phoneRule"
                            ></v-text-field>
                        </v-col>
                        <v-row no-gutters>
                        <v-col class="px-2" cols="6">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="Dob"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="Dob"
                                    label="DOB"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="[v => !!v || 'DOB is required']"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="Dob" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(Dob)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col class="d-flex px-2" cols="6">
                            <v-select
                            :items="genderOptions"
                            v-model="gender"
                            label="Gender"
                            :rules="[v => !!v || 'Gender is required']"
                            ></v-select>
                        </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col class="px-2 py-0" cols="12" md="6">
                                <v-text-field
                                    label="Password"
                                    v-model="passWord"
                                    type="password"
                                    :rules="passwordRule"
                                ></v-text-field>
                            </v-col>
                            <v-col class="px-2 py-0" cols="12" md="6">
                                <v-text-field
                                    label="Re-Enter Password"
                                    v-model="rpassWord"
                                    type="password"
                                    :rules="repasswordRule"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <p class="pr-10">Have account?<a href="/login"> login here </a></p>
                <v-btn @click="register" color="primary mr-5 mb-5">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import apiServices from '../../service/apiServices'

export default {
    name: 'register',
    data() {
        return {
            genderOptions: ['Male', 'Female'],
            menu: false,
            passWord: '',
            rpassWord: '',
            firstName: '',
            lastName: '',
            email:'',
            mobileNumber: '',
            Dob: '',
            gender: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRule: [
                v => !!v || 'Password is required',
                v => (v && v.length > 6) || 'password must be greter then 6 characters'
            ],
            repasswordRule: [
                v => !!v || 'Password is required',
                v => v === this.passWord || 'password not matching'
            ],
            phoneRule: [
                v => !!v || 'Phone Number is required',
                v => (v && v.length === 10) || 'Invalid Phone Number'
            ]
        }
    },
    methods: {
        register() {
      if(this.$refs.form.validate()) {

            var data = {
                passWord: this.passWord,
                firstName: this.firstName,
                lastName: this.lastName,
                email:this.email,
                mobileNumber: this.mobileNumber,
                Dob: this.Dob,
                gender: this.gender
            }
        apiServices.register(data).then( (result) => {
            this.$router.push('/login')

        })
        }
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

</style>