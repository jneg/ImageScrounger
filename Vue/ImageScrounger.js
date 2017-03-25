var Socket = io('http://localhost:3000')
var EE = new EventEmitter()

Vue.component('ImageScroungerUri', {
  'template':
    '<div class="ui fluid left icon input">\
      <input v-model="inputUri" placeholder="Uri">\
      <i class="browser icon"></i>\
      <button id="scrounge" @click="scroungeUri" class="ui teal basic button" style="margin-left:10px;">Scrounge</button>\
    </div>',
  'data': function () {
    return {
      'inputUri': ''
    }
  },
  'methods': {
    'scroungeUri': function () {
      $('button#scrounge').addClass('loading')
      Socket.emit('scroungeUri', this.inputUri)
    }
  },
  'mounted': function () {
    Socket.on('imageUris', function () {
      $('button#scrounge').removeClass('loading')
    })
  }
})

Vue.component('ImageScroungerControlSize', {
  'template':
   '<div class="ui left icon input">\
      <input v-model="maxImageSize" placeholder="Px" size="4">\
      <i class="expand icon"></i>\
    </div>',
  'data': function () {
    return {
      'maxImageSize': '200'
    }
  },
  'watch': {
    'maxImageSize': function (v) {
      EE.emit('maxSize', this.maxImageSize)
    }
  }
})

Vue.component('ImageScroungerControlBar', {
  'template':
   '<div class="ui basic padded segment">\
      <div class="ui center aligned grid">\
        <div class="eight wide column">\
          <ImageScroungerUri></ImageScroungerUri>\
        </div>\
        <div class="four wide column">\
          <ImageScroungerControlSize></ImageScroungerControlSize>\
        </div>\
      </div>\
    </div>'
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
  'props': ['uris', 'maxImageSize'],
  'computed': {
    'imgContainerStyle': function () {
      return {
        display: 'inline',
        margin: '5px'
      }
    },
    'imgStyle': function () {
      return {
        maxHeight: this.maxImageSize + 'px',
        maxWidth: this.maxImageSize + 'px'
      }
    }
  }
})

Vue.component('ImageScroungerController', {
  'template':
   '<main>\
     <ImageScroungerControlBar></ImageScroungerControlBar>\
     <ImageScroungerImageGrid :uris="uris" :maxImageSize="maxImageSize"></ImageScroungerImageGrid>\
    </main>',
  'data': function () {
    return {
      'uris': [],
      'maxImageSize': '200'
    }
  },
  'mounted': function () {
    Socket.on('imageUris', function (uris) {
      this.uris = uris
    }.bind(this))
    EE.on('maxSize', function (size) {
      this.maxImageSize = size;
    }.bind(this))
  }
})

new Vue({
  'el': '#Mount',
  'template': '<ImageScroungerController></ImageScroungerController>'
})
