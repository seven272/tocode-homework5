<template>
  <div v-if="isLoading">
    <Spinner></Spinner>
  </div>
  <div v-else>
     <div class="tweet-menu-wrapper">
    <div class="tweet-menu">
      <select v-model="sortBy" name="sortBy">
        <option value="date">Sort by date</option>
        <option value="likes">Sort by like</option>
      </select>
    </div>
    </div>
    <div class="tweets__wrapper" v-for="item in dataSortered" :key="item.id">
      <Tweet
      :id="item.id"
      :likes="item.likes"
      :name="item.date"
      :imgUrl="item.avatar"
      @onClick="handleLikeSubmit(item)"
      >
        <div v-html="compiledMarked(item.body)"></div>
      </Tweet>
    </div>
    <button @click="handleModalShow" class="btn btnTweet btnTweetHome">New tweet</button>
    <Modal
    :title="'New Twet'"
    v-if="showModal"
    @onClose="handleModalShow"
    >
      <!-- <TweetForm @onSubmit="handleTweetSubmit"></TweetForm> -->
      <form @submit.prevent="handleStore">
        <textarea name="body" id="body" v-model="tweet.body"></textarea>
        <button type="submit" class="btn btnTweet">Submit</button>
      </form>
    </Modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, computed, reactive, onMounted } from 'vue'
// eslint-disable-next-line no-unused-vars
import { marked } from 'marked'
import Spinner from '@/components/UI/Spinner.vue'
import Modal from '@/components/UI/Modal.vue'
import Tweet from '@/components/UI/Tweet.vue'
import http from '@/http-common'
// import TweetForm from '@/components/UI/TweetForm.vue'
export default {
  components: {
    Spinner,
    Modal,
    Tweet
    // TweetForm
  },
  data () {
    return {
      fio: 'REsh'
    }
  },
  computed: {
    myDate () {
      return this.$store.state.name
    }
  },
  setup () {
    const data = ref([])
    const isLoading = ref(true)
    // массив для хранения id твитов и последующего добавления в ЛС
    let arrIdTweetsLS = []

    const compiledMarked = text => marked(text, { santize: true })

    onMounted(() =>
      getTweets()
    )

    const getTweets = () => {
      http
        .get('/tweets.json')
        .then((res) => {
          const nextData = []

          Object.keys(res.data).forEach(key => {
            const item = res.data[key]
            nextData.push({ id: key, ...item })
          })
          data.value = nextData
          isLoading.value = false
        })
        .catch(e => console.log(e))
    }

    const getTweetsFromStore = () => {
      if (data.value.length === 0) {
        getTweets()
      } else {
        isLoading.value = false
        return data.value
      }
    }
    const handleTweetSubmit = body => {
      data.value.push({
        id: data.value.length + 1,
        body,
        avatar: 'https://tocode.ru/static/_secret/bonuses/1/avatar-1Tq9kaAql.png',
        likes: 0,
        date: new Date(Date.now()).toLocaleString()
      })
      handleModalShow()
    }
    const sortBy = ref('likes')
    const dataSortered = computed(() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return data.value.sort((a, b) => {
        if (a[sortBy.value] < b[sortBy.value]) return 1
        if (a[sortBy.value] > b[sortBy.value]) return -1
      })
    })

    const tweet = reactive({
      avatar: `https://avatars.dicebear.com/api/male/${Date.now()}.svg`,
      body: '',
      likes: 0,
      date: new Date(Date.now()).toLocaleString()
    })
    const handleStore = () => {
      http
        .post('/tweets.json', tweet)
        .then(() => {
          tweet.body = ''
          handleModalShow()
          getTweets()
        })
        .catch(e => console.log(e))
    }

    const showModal = ref(true)

    const handleModalShow = () => {
      const nextShowModal = showModal.value = !showModal.value
      showModal.value = nextShowModal
    }

    const handleLikeSubmit = (tweet) => {
      arrIdTweetsLS = JSON.parse(localStorage.getItem('likedTweets'))
      console.log('Массви ид из локала ' + arrIdTweetsLS)
      http
        .put(`/tweets/${tweet.id}.json`, tweet)
        .then(() => {
          const findId = arrIdTweetsLS.find((elem) => {
            return elem === tweet.id
          })
          if (findId) {
            tweet.likes += 0
          } else {
            arrIdTweetsLS.push(tweet.id)
            localStorage.setItem('likedTweets', JSON.stringify(arrIdTweetsLS))
            tweet.likes += 1
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }

    return {
      data,
      isLoading,
      handleModalShow,
      showModal,
      dataSortered,
      sortBy,
      handleLikeSubmit,
      handleTweetSubmit,
      tweet,
      handleStore,
      compiledMarked,
      getTweetsFromStore
    }
  }
}
</script>

<style>

</style>
