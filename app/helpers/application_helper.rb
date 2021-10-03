module ApplicationHelper
  include ApplicationHelper::GraphMethods

  def nav_entry(body, path, options = {})
    options = {
      badge: nil,
      badge_color: nil,
      icon: nil,
      class: ''
    }.merge(options)

    classes = [
      "nav-item",
      current_page?(path) ? "active" : nil,
      options[:class]
    ].compact.join(" ")

    unless options[:icon].nil?
      if options[:icon_only]
        body = "#{content_tag(:i, '', class: "fa fa-#{options[:icon]}", title: body)}"
      else
        body = "#{content_tag(:i, '', class: "fa fa-#{options[:icon]}")} #{body}"
      end
    end
    unless options[:badge].nil?
      badge_class = "badge"
      badge_class << " badge-#{options[:badge_color]}" unless options[:badge_color].nil?
      badge_class << " badge-pill" if options[:badge_pill]
      body += " #{content_tag(:span, options[:badge], class: badge_class)}"
    end

    content_tag(:li, link_to(body.html_safe, path, class: "nav-link"), class: classes)
  end

  def list_group_item(body, path, options = {})
    options = {
      badge: nil,
      badge_color: nil,
      class: ''
    }.merge(options)

    classes = [
      "list-group-item",
      "list-group-item-action",
      current_page?(path) ? "active" : nil,
      options[:class]
    ].compact.join(" ")

    unless options[:badge].nil? or options[:badge] == 0
      # TODO: make this prettier?
      body << " #{
        content_tag(:span, options[:badge], class: ("badge#{
          " badge-#{options[:badge_color]}" unless options[:badge_color].nil?
        }"))}"
    end

    content_tag(:a, body.html_safe, href: path, class: classes)
  end

  def tooltip(body, tooltip_content, placement = "bottom")
    content_tag(:span, body, {title: tooltip_content, "data-toggle" => "tooltip", "data-placement" => placement} )
  end

  def time_tooltip(subject, placement = "bottom")
    tooltip time_ago_in_words(subject.created_at), localize(subject.created_at), placement
  end

  def hidespan(body, hide)
    content_tag(:span, body, class: hide)
  end

  ##
  #
  def bootstrap_color c
    case c
    when "error", "alert"
      "danger"
    when "notice"
      "info"
    else
      c
    end
  end

  def inbox_count
    return 0 unless user_signed_in?
    count = Inbox.select("COUNT(id) AS count")
                 .where(new: true)
                 .where(user_id: current_user.id)
                 .group(:user_id)
                 .order(:count)
                 .first
    return nil if count.nil?
    return nil unless count.count > 0
    count.count
  end

  def notification_count
    return 0 unless user_signed_in?
    count = Notification.for(current_user).where(new: true)
    return nil if count.nil?
    return nil unless count.count > 0
    count.count
  end

  def privileged?(user)
    ((!current_user.nil?) && ((current_user == user) || current_user.mod?)) ? true : false
  end

  def ios_web_app?
    user_agent = request.env['HTTP_USER_AGENT'] || 'Mozilla/5.0'
    # normal MobileSafari.app UA: Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B435 Safari/600.1.4
    # webapp UA: Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B435
    return true if user_agent.match /^Mozilla\/\d+\.\d+ \(i(?:Phone|Pad|Pod); CPU(?:.*) like Mac OS X\)(?:.*) Mobile(?:\S*)$/
    false
  end

  def generate_title(name, junction = nil, content = nil, s = false)
    if s
      if name[-1].downcase != "s"
        name = name + "'s"
      else
        name = name + "'"
      end
    end

    list = [name]

    list.push junction unless junction.nil?

    unless content.nil?
      content = strip_markdown(content)
      if content.length > 45
        content = content[0..42] + "..."
      end
      list.push content
    end
    list.push "|", APP_CONFIG['site_name']

    list.join " "
  end

  def question_title(question)
    name = user_screen_name question.user, anonymous: question.author_is_anonymous, url: false
    generate_title name, "asked", question.content
  end

  def answer_title(answer)
    name = user_screen_name answer.user, anonymous: false, url: false
    generate_title name, "answered", answer.question.content
  end

  def user_title(user, junction = nil)
    name = user_screen_name user, anonymous: false, url: false
    generate_title name, junction, nil, !junction.nil?
  end

  def questions_title(user)
    user_title user, "questions"
  end

  def answers_title(user)
    user_title user, "answers"
  end

  def smiles_title(user)
    user_title user, "smiles"
  end

  def comments_title(user)
    user_title user, "comments"
  end

  def list_title(list)
    generate_title list.name
  end

  def rails_admin_path_for_resource(resource)
    [rails_admin_path, resource.model_name.param_key, resource.id].join('/')
  end
end
