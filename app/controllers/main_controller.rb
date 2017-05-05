class MainController < ApplicationController
	def index
	end

	def split_tweet_post
		arr = params[:arr]
		arr.each do |a|
			current_user.tweet(a);
		end
		render json: arr
	end
end
