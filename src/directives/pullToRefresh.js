export default {
  params: ['distance'],
  bind (el, binding) {
    /*
    let el = $(this.el)
    el.addClass('content')
    el.addClass('pull-to-refresh-content')
    el.attr('data-ptr-distance', this.params.distance)
    $(el).on('refresh', function (e) {
      this.vm[this.params.action]()
    }.bind(this))
    */
    console.log('pull-to-refresh-content');
    $(el).on('refresh', () => {
      //this.vm[this.expression]()
      this.$el[binding.expression]()
    })
  },
  unbind () {
    $.destroyPullToRefresh($(this.el))
  }
}
