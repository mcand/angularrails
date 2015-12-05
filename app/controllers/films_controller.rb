class FilmsController < ApplicationController
  before_action :set_film, only: [:show, :edit, :update, :destroy]

  def index
    @films = Film.all
    respond_to do |format|
      format.json {render json: @films}
    end
  end

  def create
    Rails.inspect
    @film = Film.new(film_params)
    if @film.save
      respond_to do |format|
        format.json {render json: @film}
      end
    end
  end

  def new
    @fiml = Film.new
  end

  def show
    Rails.logger.info("chamando show")
    respond_to do |format|
      format.json {render json: @film}
    end
    Rails.logger.info @film.name
  end

  def edit
    Rails.logger.info("chamando edit")
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def update
  end

  def destroy
    @film.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    def set_film
      @film = Film.find(params[:id])
    end

    def film_params
      params.require(:film).permit(:name, :description, :attachment_id, :category_id)
    end
end
