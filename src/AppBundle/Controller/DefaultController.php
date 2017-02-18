<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller {

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request) {
   
        
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/check", name="check")
     */
    public function checkAction(Request $request) {

        $parametersAsArray = [];
        if ($content = $request->getContent()) {
            $parametersAsArray = json_decode($content, true);
        }

        $choosenDate = str_replace(' ', '-', $parametersAsArray['choosenDate']);
        $choosenDate = \DateTime::createFromFormat('!d-m-Y', $choosenDate);

        $startDate = str_replace(' ', '-', $parametersAsArray['startDate']);
        $startDate = \DateTime::createFromFormat('!d-m-Y', $startDate);

        $endDate = str_replace(' ', '-', $parametersAsArray['endDate']);
        $endDate = \DateTime::createFromFormat('!d-m-Y', $endDate);

        if ($startDate <= $choosenDate && $choosenDate <= $endDate) {
            $resp = "попадает";
        } else {
            $resp = "не попадает";
        }

        return $this->json(array('ответ' => $resp));
    }

}
