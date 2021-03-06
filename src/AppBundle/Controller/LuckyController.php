<?php
// src/AppBundle/Controller/LuckyController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
// --> add this new use statement
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class LuckyController extends Controller
{
    /**
     * @Route("/bells")
     */
    public function numberAction()
    {
        $number = mt_rand(0, 100);

         return $this->render('lucky/number.html.twig', array(
            'number' => $number,
        ));
    }
}
