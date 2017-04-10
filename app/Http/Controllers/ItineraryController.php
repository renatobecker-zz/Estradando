<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Response;
//use Symfony\Component\Yaml\Yaml;
use JavaScript;
use Session;
use App\Models\Config\CatalogCategory as CatalogCategory;

class ItineraryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        $config = array(
                'catalog_categories' => $this->get_catalog_categories()
            );
        JavaScript::put(['config' => $config]);
        return view('pages.itinerary');
    }

    private function get_catalog_categories() {
        $catalog_categories = Session::get('catalog_categories');
        if ($catalog_categories) {
            return $catalog_categories;
        }        

        $result = $catalog_categories = CatalogCategory::all()->toArray(); 
        Session::set('catalog_categories', $catalog_categories);
        return $result;

    }
}
