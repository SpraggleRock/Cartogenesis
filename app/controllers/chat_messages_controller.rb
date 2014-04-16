class ChatMessagesController < WebsocketRails::BaseController

  def initialize_session
    controller_store[:message_count] = 0
  end

  def broadcast
    broadcast_message :notification, message, namespace: 'chat_messages'
  end

end
