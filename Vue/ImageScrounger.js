var socket = io('http://localhost:3000')

Vue.component('ImageScroungerURIBar', {
  'template':
   '<div class="ui basic segment">\
      <div class="ui center aligned grid">\
        <div class="ten wide column">\
          <div class="ui fluid action input">\
            <input v-model="inputUri" placeholder="URI">\
            <button @click="scroungeUri" class="ui teal button">Scrounge</button>\
          </div>\
        </div>\
      </div>\
    </div>',
  'props': ['uriLength'],
  'data': function () {
    return {
      'inputUri': ''
    }
  },
  'methods': {
    'scroungeUri': function () {
      socket.emit('scroungeUri', this.inputUri)
    }
  }
})

Vue.component('ImageScroungerImageGrid', {
  'template':
   '<div class="ui basic segment">\
      <div v-for="uri in uris" :style="imgContainerStyle">\
        <a :href="uri" target="_blank">\
          <img :src="uri" :style="imgStyle"/>\
        </a>\
      </div>\
    </div>',
  'props': ['uris', 'imageSize'],
  'computed': {
    'imgContainerStyle': function () {
      return {
        display: 'inline',
        margin: '5px'
      }
    },
    'imgStyle': function () {
      return {
        maxHeight: this.imageSize + 'px',
        maxWidth: this.imageSize + 'px'
      }
    }
  }
})

Vue.component('ImageScroungerController', {
  'template':
   '<main>\
     <ImageScroungerURIBar></ImageScroungerURIBar>\
     <ImageScroungerImageGrid :uris="uris" :imageSize="imageSize"></ImageScroungerImageGrid>\
    </main>',
  'data': function () {
    return {
      'uris': ['https://static.pexels.com/photos/56875/tree-dawn-nature-bucovina-56875.jpeg',
               'https://cdn.pixabay.com/photo/2014/12/22/00/07/tree-576847_1280.png',
               'http://weknowyourdreams.com/images/tree/tree-01.jpg',
               'https://lh3.googleusercontent.com/-XOLl50tjLug/V05rl_eU98I/AAAAAAABNtQ/3WhFFDlmFCk/orr-park-tree-carvings-37.jpg?imgmax=1600',
               'https://treesatlanta.org/wp-content/files_mf/cache/th_515b92c7a4ae9e77c6b55fb35c882ce8_homesliderimage5.jpg',
               'http://treegroup.info/tree-april-19.gif'],
      'imageSize': 250
    }
  },
  'mounted': function () {
    socket.on('imageUris', function (uris) {
      this.uris = uris
    }.bind(this))
  }
})

new Vue({
  'el': '#Mount',
  'template': '<ImageScroungerController></ImageScroungerController>'
})
