class Api::V1Controller < ApplicationController

  # GET /api/v1/cpv
  # params: code
  def cpv
    item = Cpv.where(code: params[:code]).first

    if item.present?
      render json: {
        'cpv': CpvSerializer.new(item),
        'ancestors': ActiveModel::Serializer::CollectionSerializer.new(item.ancestors, each_serializer: CpvSerializer)
      }, :callback => params[:callback]
    else
      render json: nil, :callback => params[:callback]
    end
  end

  # GET /api/v1/children
  # params: code
  def children
    parent = Cpv.where(code: params[:code]).first

    if parent.present?
      render json: {
        'cpvs': ActiveModel::Serializer::CollectionSerializer.new(parent.children.sorted, each_serializer: CpvSerializer),
        'ancestors': ActiveModel::Serializer::CollectionSerializer.new(parent.ancestors, each_serializer: CpvSerializer)
      }, :callback => params[:callback]
    else
      render json: [], each_serializer: CpvSerializer, :root => 'cpvs', :callback => params[:callback]
    end
  end

  # GET /api/v1/search
  # params: q
  def search
    results = Cpv.search(params[:q])

    if results.present?
      render json: {
        'cpvs': ActiveModel::Serializer::CollectionSerializer.new(results, each_serializer: CpvSerializer)
      }, :callback => params[:callback]
    else
      render json: [], each_serializer: CpvSerializer, :root => 'cpvs', :callback => params[:callback]
    end
  end


end