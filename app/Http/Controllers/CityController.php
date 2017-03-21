<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use App\Models\Geodata\Cities as Cities;
use App\Classes\Helpers as Helpers;
use Response;

class CityController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function findByName() { 

        $term   = Request::input('term');
        $cities = [];  
        if (($term) && ($term !== '')) {
            $search_term = Helpers::accentToRegex($term);
            $query_term = '/.*' . $search_term . '*/i';
            $cities = Cities::where('properties.nome_municipio', 'regexp', $query_term)->
            orderBy('properties.nome_municipio')->
            get(array('properties.geo_codigo', 'properties.nome_municipio', 'properties.sigla'));    
        }

      return Response::json($cities);                  
    }    
}
