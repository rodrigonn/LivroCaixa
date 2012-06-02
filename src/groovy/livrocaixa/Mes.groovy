package livrocaixa

class Mes {

	def numeroMes
	def ano
	
	String toString() {
		def mesAjustado = ("" + numeroMes).padLeft(2, "0")
		"${mesAjustado}/${ano}" 
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ano == null) ? 0 : ano.hashCode());
		result = prime * result
				+ ((numeroMes == null) ? 0 : numeroMes.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this.is(obj))
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Mes other = (Mes) obj;
		if (ano == null) {
			if (other.ano != null)
				return false;
		} else if (!ano.equals(other.ano))
			return false;
		if (numeroMes == null) {
			if (other.numeroMes != null)
				return false;
		} else if (!numeroMes.equals(other.numeroMes))
			return false;
		return true;
	}	
}